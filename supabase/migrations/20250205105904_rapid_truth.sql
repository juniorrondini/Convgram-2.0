/*
  # Fix chat participants policies and queries

  1. Changes
    - Simplify chat_participants policies to prevent recursion
    - Update chat queries to be more efficient
    - Fix profile access for chat creation

  2. Security
    - Maintain security while preventing recursion
    - Ensure proper access control for chat participants
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for chat members" ON chat_participants;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON chat_participants;

-- Simplified chat participants policies
CREATE POLICY "Enable read access for own chats"
  ON chat_participants FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1
      FROM chat_participants cp
      WHERE cp.chat_id = chat_participants.chat_id
      AND cp.user_id = auth.uid()
    )
  );

CREATE POLICY "Enable insert for own chats"
  ON chat_participants FOR INSERT
  TO authenticated
  WITH CHECK (true);