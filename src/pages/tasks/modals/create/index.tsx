import { TextField, Button, Grid, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Box } from "@mui/material";
import { useState } from "react";

import { ITaskCreate, createTask } from "../../../../actions/task";
import useAction from "../../../../hooks/useAction";
import { defaultCreateTask } from "./defaultValues";
import useTasks from "../../hooks";

const CreateTaskModal = () => {
  const { createModal, createTaskData, updateState, getTasks} = useTasks();
  const [task, setTask] = useState<ITaskCreate>(defaultCreateTask);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    updateState({ createModal: false });
    setTask(defaultCreateTask);
    getTasks();
  };

  const handleCreateTask = () => useAction({
    action: async () => createTask({...task, ...createTaskData }),
    callback: handleClose,
    toastMessages: {
      pending: "Criando tarefa",
      success: "Tarefa criada com sucesso",
      error: "Erro ao criar tarefa",
    },
  });

  return (
    <Dialog open={createModal} fullWidth maxWidth="md">
      <DialogTitle>Criar Nova Tarefa</DialogTitle>
      <DialogContent>
        <Box padding={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Descrição"
                name="description"
                value={task.description}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Conteúdo"
                name="content"
                value={task.content || ''}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                label="Prioridade"
                name="priority"
                value={task.priority}
                onChange={handleChange}
                fullWidth
                required
              >
                <MenuItem value="high">Alta</MenuItem>
                <MenuItem value="medium">Média</MenuItem>
                <MenuItem value="low">Baixa</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: '35px'}}>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleCreateTask} color="primary" variant="contained">
          Criar Tarefa
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTaskModal;