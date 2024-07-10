// internal
import { useAppSelector } from "@/redux/hooks";
import { CategoryData } from "@/redux/features/categories-slice";

// mui
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";

// component
import FilterPrice from "@/components/filter-price/filter-price.component";

// interface
interface FilterSectionProps {
  filteredCategory: [number, string];
  changeFilteredCategory: (newFilterCategory: [number, string]) => void;
}

// EXPORT DEFAULT
export default function FilterSection({
  filteredCategory,
  changeFilteredCategory,
}: FilterSectionProps) {
  // -------------------------- VAR --------------------------
  const categories = useAppSelector((state) => state.categories.categories);

  // -------------------------- FUNCTION --------------------------
  const handleChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const arr = event.target.value.split(",");
    changeFilteredCategory([parseInt(arr[0]), arr[1]]);
  };

  // -------------------------- MAIN --------------------------
  return (
    <Stack
      direction="column"
      divider={
        <Divider
          flexItem
          sx={{ mt: 3, mb: 3, backgroundColor: "primary.light" }}
        />
      }
    >
      <FormControl>
        <Typography mb={2} fontWeight={600}>
          CATEGORY
        </Typography>
        <RadioGroup
          aria-labelledby="category-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={filteredCategory}
          onChange={handleChangeFilter}
        >
          {categories.map((category: CategoryData) => (
            <FormControlLabel
              key={category.categoryId}
              value={[category.categoryId, category.name]}
              control={
                <Radio
                  size="small"
                  checked={category.categoryId === filteredCategory[0]}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 12,
                    },
                  }}
                />
              }
              label={<Typography fontSize={12}>{category.name}</Typography>}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <FilterPrice />
    </Stack>
  );
}
