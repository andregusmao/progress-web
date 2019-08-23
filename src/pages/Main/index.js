import React, { useState } from "react";
import { Input, Button, LinearProgress, Typography } from "@material-ui/core";
import axios from "axios";
import Header from "../../components/Header";
import useStyles from "./styles";

export default function Main() {
  const styles = useStyles();

  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  const handleSelectFile = e => {
    setFile(e.target.files[0]);
    setProgress(0);
    setMessage("");
  };

  const handleSendFiles = () => {
    const data = new FormData();
    data.append("file", file);

    axios
      .post("http://localhost:4000/upload", data, {
        onUploadProgress: event => {
          setProgress(Math.round(event.loaded * 100) / event.total);
          setMessage(
            `Aguarde, carregando... (${Math.round(
              (event.loaded / event.total * 100)
            )}%)`
          );
        }
      })
      .then(res => {
        setMessage("Carga concluída");
      })
      .catch(error => {
        setMessage(error);
      });
  };

  return (
    <>
      <Header />
      <div className={styles.root}>
        <Input
          type="file"
          margin="dense"
          onChange={handleSelectFile}
          placeholder="Selecione um arquivo"
        />
        <Button type="submit" color="primary" onClick={handleSendFiles}>
          Enviar
        </Button>
        <LinearProgress variant="determinate" value={progress} />
        {message !== "" && (
          <Typography variant="caption" color="error">
            {message}
          </Typography>
        )}
      </div>
    </>
  );
}
