import { Grid, Typography, CardContent } from "@mui/material";
import { useState } from "react";

import { CustomColumn, CustomTitleCard } from "./styles";
import CreateButton from "../createButton";
import { ColumnProps } from "./types";
import { TaskStatus } from "../../types";

const Column = ({ children, status, hasTasks }: ColumnProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const title = TaskStatus[status as keyof typeof TaskStatus];

    return (
        <Grid item xs={12} sm={6} md={2.4} key={title} sx={{ border: "none" }}>
            <CustomTitleCard>
                <CardContent sx={{ padding: "4px !important" }}>
                    <Typography variant="h6" align="center" justifyContent="center" gutterBottom color="text.primary">
                        {title.charAt(0).toUpperCase() + title.slice(1)}
                    </Typography>
                </CardContent>
            </CustomTitleCard>
            <CustomColumn
                variant="outlined"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {(isHovered && !hasTasks) && <CreateButton status={status} />}
                {children}
                {(isHovered && hasTasks) && <CreateButton status={status} />}
            </CustomColumn>
        </Grid>
    );
};

export default Column;
