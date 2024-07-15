import { SetStateAction } from "react";

// mui
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Stack from "@mui/material/Stack";
import Input from "@mui/material/Input";

interface SearchBarProps {
  setSearchQuery: (value: string) => void;
  placeholder: string;
  bgcolor?: boolean;
  maxWidth?: number;
  py?: boolean;
}

export default function SearchBar({
  setSearchQuery,
  bgcolor,
  placeholder,
  maxWidth,
  py,
}: SearchBarProps) {
  return (
    <Stack
      direction="row"
      sx={{
        flex: 1,
        pl: 2,
        pr: 1,
        py: py ? 1 : 0,
        borderRadius: 1,
        border: bgcolor ? "none" : "1px solid #c4c4c4",
        "&:hover": {
          borderColor: "primary.main",
        },
        bgcolor: bgcolor ? "primary.light" : "",
      }}
      maxWidth={maxWidth}
    >
      <Input
        type="text"
        placeholder={placeholder}
        disableUnderline
        sx={{
          flex: 1,
          fontSize: 12,
        }}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <IconButton sx={{ color: "primary.dark" }} onClick={() => {}}>
        <SearchIcon />
      </IconButton>
    </Stack>
  );
}
