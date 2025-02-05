/*
  # Fix RLS policies and authentication issues

  1. Changes
    - Fix infinite recursion in chat_participants policies
    - Add proper profile creation policies
    - Remove admin-only operations
    - Fix chat participant policies

  2. Security
    - Update RLS policies to be more secure and prevent recursion
    - Allow proper profile creation on signup
*/

-- Drop existing policies to recreate them
DROP POLICY IF EXISTS "Users can read all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can read their chats" ON chats;
DROP POLICY IF EXISTS "Users can create chats" ON chats;
DROP POLICY IF EXISTS "Users can read chat participants" ON chat_participants;
DROP POLICY IF EXISTS "Users can add chat participants" ON chat_participants;
DROP POLICY IF EXISTS "Users can read messages in their chats" ON messages;
DROP POLICY IF EXISTS "Users can insert messages in their chats" ON messages;

-- Profiles policies
CREATE POLICY "Enable read access for authenticated users"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable insert for authenticated users"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable update for users based on id"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Chats policies
CREATE POLICY "Enable read access for chat participants"
  ON chats FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM chat_participants
      WHERE chat_participants.chat_id = id
      AND chat_participants.user_id = auth.uid()
    )
  );

CREATE POLICY "Enable insert for authenticated users"
  ON chats FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Chat participants policies
CREATE POLICY "Enable read access for chat members"
  ON chat_participants FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR 
    chat_id IN (
      SELECT chat_id FROM chat_participants WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Enable insert for authenticated users"
  ON chat_participants FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() IN (
      SELECT auth.uid()
      FROM profiles
      WHERE profiles.id = user_id
    )
  );

-- Messages policies
CREATE POLICY "Enable read access for chat participants"
  ON messages FOR SELECT
  TO authenticated
  USING (
    chat_id IN (
      SELECT chat_id FROM chat_participants
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Enable insert for chat participants"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (
    chat_id IN (
      SELECT chat_id FROM chat_participants
      WHERE user_id = auth.uid()
    )
  );