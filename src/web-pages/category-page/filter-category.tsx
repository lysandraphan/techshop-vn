import { useRouter } from "next/navigation";

// internal
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  CategoryData,
  getCategoryRoute,
} from "@/redux/features/categories-slice";
import { setFilterCategory } from "@/redux/features/filter-slice";

// mui
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";

// EXPORT DEFAULT
export default function FilterCategory() {
  // -------------------------- VAR --------------------------
  const categories = useAppSelector((state) => state.categories.categories);

  const filterCategory = useAppSelector((state) => state.filter.filterCategory);

  const isDisableFilter = useAppSelector(
    (state) => state.filter.isDisableFilter
  );
  const dispatch = useAppDispatch();

  const router = useRouter();

  // -------------------------- FUNCTION --------------------------
  const handleChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const arr = event.target.value.split(",");
    const categoryId = parseInt(arr[0]);
    const categoryName = arr[1];

    dispatch(setFilterCategory([categoryId, categoryName]));

    router.push(getCategoryRoute(categoryName, categoryId));
  };

  // -------------------------- MAIN --------------------------
  return (
    <FormControl>
      <Typography mb={2} fontWeight={600}>
        CATEGORY
      </Typography>
      <RadioGroup
        aria-labelledby="category-radio-buttons-group"
        name="category-radio-buttons-group"
        value={filterCategory}
        onChange={handleChangeFilter}
      >
        {categories.map((category: CategoryData) => (
          <FormControlLabel
            key={category.categoryId}
            value={[category.categoryId, category.name]}
            control={
              <Radio
                size="small"
                checked={category.categoryId === filterCategory[0]}
                disabled={isDisableFilter}
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
  );
}
