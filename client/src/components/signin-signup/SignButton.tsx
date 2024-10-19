import { Button } from "@mui/material";
import { ReactNode } from "react";

interface SignButtonProps {
  title: string;
  variant: string;
  isFormValid?: boolean;
  icon?: ReactNode;
}

const SignButton: React.FC<SignButtonProps> = ({
  title,
  isFormValid = true,
  variant,
  icon,
}) => {
  return (
    <Button
      sx={
        variant === "outlined"
          ? {
              width: "65%",
              height: "40px",
              border: "solid #CFD6E4 1px",
              color: "black",
            }
          : { width: "65%", height: "40px" }
      }
      variant={variant}
      disabled={!isFormValid}
      startIcon={icon}
    >
      {title}
    </Button>
  );
};

export default SignButton;
