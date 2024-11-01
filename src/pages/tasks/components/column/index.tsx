import { Grid, Typography } from "@mui/material";

import { CustomColumn } from "./styles";
import { ColumnProps} from "./types";

const Column = ({children, title}: ColumnProps) => {
    return (
        <Grid item xs={12} sm={6} md={2.4} key={title} sx={{ border: "none"}}>
            <Typography variant="h6" align="center" gutterBottom>
                {title.charAt(0).toUpperCase() + title.slice(1)}
            </Typography>
            <CustomColumn variant="outlined">
                {children}
            </CustomColumn>
        </Grid>
    );
};

export default Column;