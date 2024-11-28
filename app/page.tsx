import ContentPage from "./components/Content/ContentPage";
import Header from "./components/Header";
import { FiltersProvider } from "./context/FiltersContext";


export default function Home() {
  return (
    <div className="flex flex-col">
      <FiltersProvider>
        <Header />
        <main className="p-2">
          <ContentPage />
        </main>
      </FiltersProvider>
    </div>
  );
}
