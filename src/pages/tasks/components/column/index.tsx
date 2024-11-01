import { Grid, Typography, CardContent } from "@mui/material";

import { CustomColumn, CustomTitleCard } from "./styles";
import { ColumnProps } from "./types";

const Column = ({ children, title }: ColumnProps) => {
    return (
        <Grid item xs={12} sm={6} md={2.4} key={title} sx={{ border: "none" }}>
            <CustomTitleCard>
                <CardContent sx={{ padding: "4px !important" }}>
                    <Typography variant="h6" align="center" justifyContent="center" gutterBottom color="text.primary">
                        {title.charAt(0).toUpperCase() + title.slice(1)}
                    </Typography>
                </CardContent>
            </CustomTitleCard>
            <CustomColumn variant="outlined">
                {children}
            </CustomColumn>
        </Grid>
    );
};

export default Column;