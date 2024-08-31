import { Button, CircularProgress, Grid, Box } from "@mui/material";
import { DropzoneArea } from 'mui-file-dropzone';
import { toast } from "react-toastify";
import { useState } from "react";

import uploadImage from "../../../../services/uploadImage";
import { ModalProps } from "../../types";

const ProfileModal:React.FC<ModalProps> = ({onHandleLink}) => {
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const handleUpload = async (image: File) => {
        const send = async () => {
            const result = await uploadImage(image);
            if (result && typeof result === 'object' && 'error' in result) {
                toast.warning(result.error);
                throw new Error(result.error);
            }
            onHandleLink(result as string);
        };
        await toast.promise(
            send(),
            {
                pending: 'Enviando imagem',
                success: 'Imagem atualizada',
                error: 'Erro ao enviar imagem',
            }
        );
    };

    return (
        <Grid container direction="column" alignItems="center" spacing={2}>
            <Grid item xs={12}>
                {uploading ? (
                    <CircularProgress />
                ) : (
                    <Box sx={{ border: 'none', backgroundColor: 'transparent', borderRadius: 2, padding: 2, width: '100%', maxWidth: 400 }}>
                        <DropzoneArea
                            onChange={(newFiles: File[]) => {
                                setFile(newFiles[0] || null); 
                            }}
                            acceptedFiles={['image/*']}
                            dropzoneText="Arraste e solte uma imagem aqui ou clique para selecionar"
                            fileObjects={file ? [{
                                file,
                                url: URL.createObjectURL(file)
                            }] : []}
                            showPreviews={true}
                            showPreviewsInDropzone={false}
                            showFileNames={false}
                            showFileNamesInPreview={false}
                            dropzoneClass="custom-dropzone"
                        />
                    </Box>
                )}
            </Grid>
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        if (file) {
                            setUploading(true);
                            handleUpload(file)
                                .finally(() => setUploading(false));
                        }
                    }}
                    disabled={uploading || !file}
                >
                    Enviar Imagem
                </Button>
            </Grid>
        </Grid>
    );
};

export default ProfileModal;
