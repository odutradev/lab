import { Box, Grid, Typography, Card, CardContent, Tabs, Tab, Chip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";

import { getAllTasks, createTask, ITaskAndSubs } from "../../actions/task";
import DashboardLayout from "../../components/layout";
import useAction from "../../hooks/useAction";
import useUserStore from "../../store/user";

const Tasks = () => {
    const [ tasks, setTasks ] = useState<ITaskAndSubs[]>([]);

    const { user } = useUserStore(x => x);

    const handleCreateSpace = () => useAction({
        action: async () =>  {},
        callback: () => {
            
        },
        toastMessages:  {
            pending: 'Criando task',
            success: 'Task criada',
            error: 'Erro ao criar',
        }
    });

    useEffect(() => {
        (async () => {
            const response = await getAllTasks();
            if ('error' in response) return;
            setTasks(response);
        })()
    }, [])

    return (
        <DashboardLayout title="TAREFAS">
            <></>
        </DashboardLayout>
    );
};

export default Tasks;
