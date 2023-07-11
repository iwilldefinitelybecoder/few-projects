const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
 
app.post('/execute', (req, res) => {
  const command = req.body.command;
  const shell = 'C:/cygwin64/bin/bash.exe'; // Use Bash as the shell

  exec(command,{shell:shell}, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${command}`);
      console.error(error);
      res.status(500).json({ error: 'Command execution failed' });
    } else { 
      console.log(`Command: ${command}`);
      if (stdout) console.log(`Output:\n${stdout}`);
      if (stderr) console.error(`Error:\n${stderr}`);
      res.status(200).json({ output: stdout });
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
