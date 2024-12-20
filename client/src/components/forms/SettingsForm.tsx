import { useState } from "react";
import {
  Box,
  Button,
  Card,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { addSettings } from "@/lib/utils";
import { SettingsInfo } from "@/lib/types";

const languages = ["English", "Turkish", "Spanish", "French", "German"];

interface SettingsFormProps {
  topicData: string;
  statusData: boolean;
  languageData: string;
}

const SettingsForm: React.FC<SettingsFormProps> = ({
  topicData = "",
  statusData = false,
  languageData = "",
}) => {
  const [topic, setTopic] = useState(topicData);
  const [language, setLanguage] = useState(languageData);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (isFormValid) {
      try {
        const settingsInfo: SettingsInfo = await addSettings({
          topic,
          language,
        });
        if (settingsInfo.status) {
          console.log(settingsInfo);
        } else {
          alert("settings failed: " + settingsInfo.message);
        }
      } catch (error) {
        alert("settings failed: " + error.message);
      }
    }
    return;
  };

  const isFormValid = () => {
    return topic && language;
  };

  return (
    <Card
      component="form"
      onSubmit={handleSubmit}
      sx={{
        paddingBottom: 6,
        paddingTop: 2,
        margin: 2,
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
        Ayarlar
      </Typography>

      <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
        <FormControl fullWidth margin="normal" sx={{ width: "30%" }}>
          <TextField
            onChange={(e) => setTopic(e.target.value)}
            id="outlined-basic"
            placeholder="Genel Başlık"
            variant="outlined"
            disabled={statusData}
            value={topic}
          />
        </FormControl>
        <FormControl fullWidth margin="normal" sx={{ width: "30%" }}>
          <Select
            disabled={statusData}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            displayEmpty
            renderValue={(selected) => {
              if (!selected) {
                return <span style={{ color: "gray" }}>Dil Seçimi</span>;
              }
              return selected;
            }}
          >
            <MenuItem value="" disabled>
              Dil Seçimi
            </MenuItem>
            {languages.map((languageOption) => (
              <MenuItem key={languageOption} value={languageOption}>
                {languageOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: "10%", height: "56px", marginTop: "14px" }}
          disabled={!isFormValid() || statusData}
        >
          Kaydet
        </Button>
      </Box>
    </Card>
  );
};

export default SettingsForm;
