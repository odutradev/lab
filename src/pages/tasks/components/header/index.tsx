import { Grid, TextField, Button} from "@mui/material"
import { useState } from "react";

import useAction from "../../../../hooks/useAction";

const Header = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    const handleCreateTask = () => {
        useAction({
          action: async () => {},
          callback: () => {},
          toastMessages: {
            pending: "Criando task",
            success: "Task criada",
            error: "Erro ao criar",
          },
        });
      };

    return (
        <Grid container justifyContent="center" gap="1rem" style={{ marginTop: "25px", marginBottom: "25px" }}>
            <TextField
            label="Pesquisar tarefa"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: "80%" }}
            />
            <Button variant="contained" color="primary" sx={{ width: "15%" }} onClick={handleCreateTask}>
            Criar Tarefa
            </Button>
      </Grid>
    );
};

export default Header