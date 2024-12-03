import { createClient } from '@supabase/supabase-js'
const SUPAURL = "https://imadyolxtyezkqefwjxq.supabase.co";
const SUPAKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltYWR5b2x4dHllemtxZWZ3anhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxNTkwOTksImV4cCI6MjA0ODczNTA5OX0.hQM-sNmKdjSVtVU6ovI8CeLLnfKs7n9AU6H2wXcqS2s";
export const supabase = createClient(SUPAURL, SUPAKEY);