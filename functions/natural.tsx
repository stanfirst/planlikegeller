import { Services } from "@/constants/services";
import natural from "natural";

export function Processing(command: string, speak: any) {
  const tokenizer = new natural.WordTokenizer();
  const ytokens = tokenizer.tokenize(
    "Hello I am Sandeep Gandham. How are you?"
  );
  const classifier = new natural.LogisticRegressionClassifier();
  classifier.addDocument("Photo", "Photographer");
  classifier.addDocument("Video", "Photographer");
  classifier.addDocument("Videography", "Photographer");
  classifier.addDocument("Videographer", "Photographer");
  classifier.addDocument("Photographer", "Photographer");
  classifier.addDocument("Photography", "Photographer");
  classifier.addDocument("Cinematic", "Photographer");
  classifier.addDocument("Cinematography", "Photographer");
  classifier.addDocument("Place", "Venue");
  classifier.addDocument("Venue", "Venue");
  classifier.addDocument("Hall", "Venue");
  classifier.addDocument("Hotel", "Venue");
  classifier.addDocument("Resort", "Venue");
  classifier.addDocument("Venue's", "Venue");
  classifier.addDocument("Makeup", "Makeup Artist");
  classifier.addDocument("Make up", "Makeup Artist");
  classifier.addDocument("Make up Artist", "Makeup Artist");
  classifier.addDocument("Make up's Artist", "Makeup Artist");
  classifier.addDocument("Makeup Artist", "Makeup Artist");
  classifier.addDocument("Mehendi", "Mehendi Artist");
  classifier.addDocument("Mehendi Artist", "Mehendi Artist");
  classifier.addDocument("Mehendi's", "Mehendi Artist");
  classifier.addDocument("Mehendi Artists", "Mehendi Artist");
  classifier.addDocument("Mehendi's Artist", "Mehendi Artist");
  classifier.addDocument("Mehendi's Artists", "Mehendi Artist");
  classifier.addDocument("Mehendi's Artists", "Mehendi Artist");
  classifier.addDocument("Mehndi", "Mehendi Artist");
  classifier.addDocument("Mehndi Artist", "Mehendi Artist");
  classifier.addDocument("Mehndi's", "Mehendi Artist");
  classifier.addDocument("Mehndi Artists", "Mehendi Artist");
  classifier.addDocument("Decorations", "Decorator");
  classifier.addDocument("Decoration", "Decorator");
  classifier.addDocument("Decorators", "Decorator");
  classifier.addDocument("Decorator", "Decorator");
  classifier.addDocument("Decor", "Decorator");
  classifier.addDocument("Flowers", "Decorator");
  classifier.addDocument("Flower", "Decorator");
  classifier.addDocument("Flower's", "Decorator");
  classifier.addDocument("Flower's Decorator", "Decorator");
  classifier.addDocument("Flower's Decorators", "Decorator");
  classifier.addDocument("Flower's Decor", "Decorator");
  classifier.addDocument("Flower's Decorations", "Decorator");
  classifier.addDocument("Flower's Decoration", "Decorator");
  classifier.addDocument("Food", "Food Caterers");
  classifier.addDocument("Food Caterer", "Food Caterers");
  classifier.addDocument("Food Caterers", "Food Caterers");
  classifier.addDocument("Caterer", "Food Caterers");
  classifier.addDocument("Caterers", "Food Caterers");
  classifier.addDocument("Catering", "Food Caterers");
  classifier.addDocument("Catering's", "Food Caterers");
  classifier.addDocument("Food Catering", "Food Caterers");
  classifier.addDocument("Dinner", "Food Caterers");
  classifier.addDocument("Lunch", "Food Caterers");
  classifier.addDocument("Breakfast", "Food Caterers");
  classifier.addDocument("Music", "Music/DJ");
  classifier.addDocument("Music's", "Music/DJ");
  classifier.addDocument("Music's DJ", "Music/DJ");
  classifier.addDocument("Sound System", "Music/DJ");
  classifier.addDocument("Songs", "Music/DJ");
  classifier.addDocument("Song", "Music/DJ");

  classifier.train();

  const keyword = classifier.classify(
    natural.PorterStemmer.tokenizeAndStem(command).toString()
  );
  console.log("Keyword: ", keyword);
  console.log(
    Services.service_providers.filter((s) => s.service_type === keyword)
  );
  speak({ text: `You're looking for: ${keyword}` });
  return (
    <div>
      <h1 style={{ fontSize: "30px" }}>
        You're looking for:&nbsp;
        {keyword}
      </h1>
      <br />

      {Services.service_providers
        .filter((s) => s.service_type === keyword)
        .map((filtered) => (
          <div>
            <ul>
              <li style={{ fontSize: "40px" }}>
                {filtered.name}
                <ol>
                  <li>City: {filtered.city}</li>
                  <li>Service Type: {filtered.service_type}</li>
                  <li>Rating: {filtered.rating}</li>
                  <li>Price: {filtered.price}</li>
                </ol>
              </li>
            </ul>
          </div>
        ))}
    </div>
  );
}
