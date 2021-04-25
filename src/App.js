import React, { useEffect, useState } from "react";
import "./App.css";
import Recipe from "./Recipe";

function App() {
  /* 1. PART  ===================================================================*/
  const APP_ID = "dd9c77e3";
  const APP_KEY = "08a276df9605dc6b1f6426dcec46ecb3";
  /*  const search_URL = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`; */

  /* 4. PART API verilerini alalim  ===================================================================
  neden useState icine [] koyduk. cunku API dan cekmek istedigimiz veri hints bir nesne dizisi bir dizi veri array of object*/
  const [recipes, setRecipes] = useState([]);
  /* 6. PART search yapalim sonucu sayfamizda gorelim  ===================================================================
   state olusturduktan sonra search stateini gidip input satirinin value degeri olarak tanimlayalim
  */
  const [search, setSearch] = useState("");

  /* 8. PART search islemi submit tusuna basildiktan sonra APIa gonderilecek ===================================================================
  query i URL de chicken ile yer degistirdik simdi setQuery icin bir formul yazip form tagina onSubmit olarak ekliyecegiz
  */
  const [query, setQuery] = useState("chicken");
  /* 3. PART ===================================================================
    useEffect nedir??? nezaman sayfamiz yenilenirse useEffect formulumuz otomatik olarak calsina bir fonksiyon
    useEffect parametre olarak icine arrow fanksini alir
    Sayfada hareketlilik oldugunda surekli useEffect formulunun calismasini istemiyorsak 2. bir argument olarak bos []  ekleyebiliriz.
    Sadece sayfa sayfa acilisinda yada sadece bizim istedigimiz bir zaman calismasini saglaybiliriz. 
    Orngin bir state verebiliriz state degistikce useEffect calisir. 
   
    useEffect ile ne yapilir???
    useEffect fonksiyonu ile API dan istekde bulunabiliriz.
    yanliz birada async await cagirmasi yapamaliyiz.
   
    Async await nedir???
    bir islemi yaparken bekle o is bittikden sonra siradaki ise koyul demek.

    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(52);
    useEffect(() => {
      console.log(`useEffect Calisti ${count}`);
    }, [count]);

    function incCount() {
      setCount(count + 1);
    }
    function incCount2() {
      setCount2(count2 + 1);
    }
    <h1 onClick={incCount}>{count}</h1>
    <h1 onClick={incCount2}>{count2}</h1>
  */
  useEffect(() => {
    getRecipes();
    console.log("hello");
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    /* fetch yaptikdan sonra is bitmiyor tabiki cagiri yaptigimiz verileri rahatca isleyebilmemiz icin veriyi json() sormatina ceviriyoruz.
  bunu pdf dosyayi word dosyasina cevirmek gibi dusunebilirsiniz. 
  data degiskenimize de await ile bekletiyoruz unutmayin mezaman bir promise olusturusaniz await ile promise yerine getirilene kadar bekletmelisiniz. bazi veriler bir anda gelmeye bilir.
  */

    const data = await response.json();
    /* simdi data.hits ocon bir State olusturalim Api dan gelen her farkli veri icin yeni veriy baz alabilelim. */
    console.log(data.hits);
    /* simdi buraya 4. parttaki state olusturdukdan sonra API dan gelen her turlu degisikligi gore statemizin degismesi icn setRecipes getRecipe async fonksiyonumuzun icin ekliyoruz
    boylese  artik tum veriler recipes degiskenimizin icine hapsettik.
    simdi bu veriler kendi web sayfamizda sergileme vakti.
    bunun icin Recipe.js adinda ayri bir componen lusturalim. 
    bunu yapmamizdaki amac ana js dosyamizi karman corman yapmayip ilerde projemizde degisiklik yaparken sikinti cekmemektir.
     verileri Recipe.js dosyasinda duzenleyecegiz map metodu ile App.js ana js dosyamiza tasiyacagiz */
    setRecipes(data.hits);
  };

  /* 7. PART on CHange icin olusturulan formul ===================================================================
  bu formulde event alacagiz => fonksiyonu ile
  bu nedemek??
  kisaca nezaman onChange calistirdigimizda bir event alacagiz yani targeta ulasmis olacagiz 
  bizim bu formulle amacimiz setSearch kullanarak search statetimizi modifiye etmek
  bunu yapalimki empty string olarak ayarladigimiz baslangic degerini degistirip search bara yazi yaza bilelim 
  */
  const updateSearch = (e) => {
    setSearch(e.target.value);
    /* console.log(search); */
    /* bunu bitirdikten sonra useEffect 2.  argumantina search yazip goster sistem nasil kitleniyor  */
  };
  /* 9. PART on CHange icin olusturulan formul ===================================================================
  neden buna ihtiyacimiz var???
burada tusa basildiginda setQuery Search statemintimiza hapsettigimiz son degeri query statementimiza hapsedelim 1 deger gonderelim API 
 e.preventDefaul() sayfanin surekli yenilenmesini durdurmak icin kullaniyoruz.
 simdi useEffect 2. argumentine query statementene ekleye biliriz.
 boylece API a 1 degisken gondermis olacagiz. buda sistemin kitlenmesini engelleyecek
  */
  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };
  return (
    <div className="App">
      {/* 2. PART FORM =================================================================== */}
      <form onSubmit={getSearch} className="search-form" action="">
        <input
          onFocus
          className="search-bar"
          type="text"
          /* value ve onChange kismini 6.parttan sonra koyuyoruz 
          onChange icin yukarda bir fonksiyon yaziyoruz*/
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      {/* 5. PART ================================================
      API dan aldigimiz ve recipe stateimize hapsettigimiz tum verileri "map" ile yorumlayip Recipe.js dosyamizda olusturdugumuz formata sokalim  ===================================================================
      bu rada kullandigimiz > fonksiyonuna dikkat edin {} yerine () kullaniyoruz cunku HTML yada JSX getirecegiz */}
      <div className="recipes">
        {recipes.map((recp) => (
          <Recipe
            key={recp.recipe.label + recp.recipe.calories}
            title={recp.recipe.label}
            calories={recp.recipe.calories}
            image={recp.recipe.image}
            ing={recp.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
