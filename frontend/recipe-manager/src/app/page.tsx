import RecipeList from "../components/RecipeList";
import AddRecipe from "../components/AddRecipe";

const Home: React.FC = () => {
  return (
    <div>
      <AddRecipe />
      <RecipeList />
    </div>
  );
};

export default Home;
