import express from 'express';
import {createClient} from '@supabase/supabase-js'
import morgan from 'morgan'
import bodyParser from "body-parser";
import cors from 'cors';

const SUPAURL = "https://imadyolxtyezkqefwjxq.supabase.co";
const SUPAKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltYWR5b2x4dHllemtxZWZ3anhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxNTkwOTksImV4cCI6MjA0ODczNTA5OX0.hQM-sNmKdjSVtVU6ovI8CeLLnfKs7n9AU6H2wXcqS2s";
const supabase = createClient(SUPAURL, SUPAKEY);

const app = express();

const corsOption = {
    origin: '*',
    methods: [ 'GET', 'POST', ],
    allowedHeaders: [ 'Content-Type', ],
};

// using morgan for logs
app.use(morgan('combined'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors(corsOption));

app.post('/login', async (req, res) => {
    console.log('login', req.body);
    const { error } = await supabase.auth.signInWithPassword(req.body);
    if (error) res.send({ success: false });
    else res.send({ success: true });
});

app.get('/get-loggedinuser', async (req, res) => {
    const { data } = await supabase.auth.getUser();
    if (data.user && data.user.id) {
        if (data.user && data.user.id) {
            const response = await supabase
            .from('users')
            .select()
            .match({ guid: data.user.id, isActive: true })
            .single()            
            res.send({ success: true, user: response.data });
          } else res.send({ success: false });
    }
    else res.send({ success: false });
});

app.get('/', (req, res) => {
    res.send("Hello I am working my friend Supabase <3");
});

app.get('*', (req, res) => {
    res.send("Hello again I am working my friend to the moon and behind <3");
});

app.listen(3000, () => {
    console.log(`> Ready on http://localhost:3000`);
});