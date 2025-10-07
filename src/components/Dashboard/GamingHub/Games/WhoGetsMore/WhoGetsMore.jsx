import React, { useState, useEffect } from "react";

const WhoGetsMore = () => {
  const [person1Info, setPerson1Info] = useState({});
  const [person2Info, setPerson2Info] = useState({});
  const [person1TotalAssets, setPerson1TotalAssets] = useState(0);
  const [person2TotalAssets, setPerson2TotalAssets] = useState(0);
  const [person1Personality, setPerson1Personality] = useState('');
  const [person2Personality, setPerson2Personality] = useState('');
  const [person1Name, setPerson1Name] = useState('');
  const [person2Name, setPerson2Name] = useState('');
  const [winner, setWinner] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const generateRandomValue = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generateInformation = () => {
    const start_age = generateRandomValue(20, 40);
    const current_age = generateRandomValue(start_age + 2, 60);
    const rpa = generateRandomValue(100, 800) / 100; // Convert to decimal between 1% and 8%
    const monthly_installment = generateRandomValue(500, 2000);
    const lumpsum_amount = generateRandomValue(10000, 100000);
    const age_diff = current_age - start_age;

    // Check if generated values resemble real-world values
    if (rpa < 0 || rpa > 8 || monthly_installment < 0 || lumpsum_amount < 0) {
      return generateInformation(); // Re-generate if values are unrealistic
    }
  
    return {
      start_age,
      current_age,
      rpa,
      monthly_installment,
      lumpsum_amount,
      age_diff
    };
  };

  const calculateTotalAssets = (info) => {
    const { rpa, monthly_installment, lumpsum_amount, age_diff } =
      info;
    const totalRPA = rpa * age_diff;
    const totalMonthlyInstallment = monthly_installment * 12 * age_diff;
    const totalAssets = totalRPA + totalMonthlyInstallment + lumpsum_amount;
    return totalAssets;
  };

  const giveRandomPersonality = (info) => {
    const { start_age, current_age, rpa, monthly_installment, lumpsum_amount, age_diff } = info;

    const personalities = [
      "Arjun, with {age_diff} years of experience in the financial markets, started investing at the age of {start_age} and is currently {current_age} years old. His Rate per Annum (RPA) stands at {rpa}%. He diligently allocates ${monthly_installment} every month and holds a substantial lump sum of ${lumpsum_amount}.",
      "Aarav, a visionary in the tech industry, embarked on his entrepreneurial journey at the age of {start_age} and has achieved remarkable success by the age of {current_age}. With an impressive Rate per Annum (RPA) of {rpa}%, he invests ${monthly_installment} monthly and maintains a substantial lump sum of ${lumpsum_amount}.",
      "Ishan, an enthusiastic young trader, started trading at the age of {start_age} and is rapidly honing his skills in the financial markets. With a promising Rate per Annum (RPA) of {rpa}%, he diligently sets aside ${monthly_installment} every month and holds a growing lump sum of ${lumpsum_amount}.",
      "Priya, a shrewd investor in the real estate sector, entered the market at the age of {start_age}, now is {current_age} and has since established herself as a prominent figure in the industry. With a diverse portfolio and a Rate per Annum (RPA) of {rpa}%, she invests ${monthly_installment} monthly and maintains a substantial lump sum of ${lumpsum_amount}.",
      "Rajesh, a young and ambitious investor, began his journey into finance at the age of {start_age} and now is {current_age} and is making significant strides in building his wealth. With an impressive Rate per Annum (RPA) of {rpa}%, he diligently invests ${monthly_installment} each month and holds a growing lump sum of ${lumpsum_amount}.",
      "Devika, a socially conscious investor, started investing at the age of {start_age}, now {current_age} and is committed to making a positive impact through her financial decisions. With a sustainable Rate per Annum (RPA) of {rpa}%, she allocates ${monthly_installment} monthly and holds a substantial lump sum of ${lumpsum_amount}."
    ]

    const images = [
      "../../../../../../public/arjun.png",
      "../../../../../../public/aarav.png",
      "../../../../../../public/ishan.jpg",
      "../../../../../../public/priya.webp",
      "../../../../../../public/rajesh.webp",
      "../../../../../../public/devika.jpg"
    ]

    const randomIndex = Math.floor(Math.random() * personalities.length);
    let personality = personalities[randomIndex];

    // Replace placeholders with actual values
    personality = personality.replace(/{start_age}/g, start_age);
    personality = personality.replace(/{current_age}/g, current_age);
    personality = personality.replace(/{rpa}/g, rpa);
    personality = personality.replace(/{monthly_installment}/g, monthly_installment);
    personality = personality.replace(/{lumpsum_amount}/g, lumpsum_amount);
    personality = personality.replace(/{age_diff}/g, age_diff);

    return personality;
  }

  useEffect(() => {
    let person1 = generateInformation();
    let person2 = generateInformation();
    
    setPerson1Info(person1);
    setPerson2Info(person2);
  
    // Update total assets using callback functions to ensure updated state values are used
    setPerson1TotalAssets(prevState => calculateTotalAssets(person1));
    setPerson2TotalAssets(prevState => calculateTotalAssets(person2));

    let person1Personality = giveRandomPersonality(person1);
    let person2Personality = giveRandomPersonality(person2);
    while(person1Personality.split(',')[0].trim() == person2Personality.split(',')[0].trim())
      person2Personality = giveRandomPersonality(person2)

    setPerson1Personality(person1Personality);
    setPerson2Personality(person2Personality);
  
    // Extract names from personalities and set person1Name and person2Name
    const person1Name = person1Personality.split(',')[0].trim();
    const person2Name = person2Personality.split(',')[0].trim();
    setPerson1Name(person1Name);
    setPerson2Name(person2Name);
  }, []);

  useEffect(() => {
    console.log("Person1: ", person1TotalAssets);
    console.log("Person2: ", person2TotalAssets);
  }, [person1TotalAssets, person2TotalAssets]);

  const handleUserChoice = (chosenTrader) => {
    setSelectedOption(chosenTrader);
    if (chosenTrader === person1Name) {
      if (person1TotalAssets > person2TotalAssets) {
        setWinner(chosenTrader);
      } else {
        setWinner(person2Name);
      }
    } else if (chosenTrader === person2Name) {
      if (person2TotalAssets > person1TotalAssets) {
        setWinner(chosenTrader);
      } else {
        setWinner(person1Name);
      }
    }
  };

  const handleNextQuestion = () => {
    // Re-run the logic to generate new game data
    let person1 = generateInformation();
    let person2 = generateInformation();
    
    setPerson1Info(person1);
    setPerson2Info(person2);
  
    // Update total assets using callback functions to ensure updated state values are used
    setPerson1TotalAssets(prevState => calculateTotalAssets(person1));
    setPerson2TotalAssets(prevState => calculateTotalAssets(person2));
  
    let person1Personality = giveRandomPersonality(person1);
    let person2Personality = giveRandomPersonality(person2);

    while(person1Personality.split(',')[0].trim() == person2Personality.split(',')[0].trim())
      person2Personality = giveRandomPersonality(person2)

    setPerson1Personality(person1Personality);
    setPerson2Personality(person2Personality);
  
    // Extract names from personalities and set person1Name and person2Name
    const person1Name = person1Personality.split(',')[0].trim();
    const person2Name = person2Personality.split(',')[0].trim();
    setPerson1Name(person1Name);
    setPerson2Name(person2Name);
  
    // Reset winner and selected option
    setWinner(null);
    setSelectedOption(null);
  };
  

  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center pt-10 px-10">
        <h1 className="text-3xl text-center">
          WELCOME TO THE GAME OF WHO GETS MORE!!!
        </h1>

        <div className="flex justify-evenly">
          <div className="w-1/6">
            <img
              src={`../../../../../../public/${person1Name.toLowerCase()}.png`}
              alt={`${person1Name.toLowerCase()}`}
            />
            <h1 className="text-2xl text-center">{person1Name}</h1>
            <p className="text-lg text-center">
              {person1Personality}
            </p>
          </div>
          <div className="w-1/6">
            <img src={`../../../../../../public/${person2Name.toLowerCase()}.png`} alt={`${person2Name.toLowerCase()}`} />
            <h1 className="text-2xl text-center">{person2Name}</h1>
            <p className="text-lg text-center">
            {person2Personality}
            </p>
          </div>
        </div>

        <div className="mt-5">
          <button
            className="w-40 border-black border m-2 bg-theme text-white hover:bg-opacity-80 hover:border-opacity-80 transition duration-300 ease-in-out"
            onClick={() => handleUserChoice(person1Name)}
          >
            Choose {person1Name}
          </button>
          <button
            className="w-40 border-black border m-2 bg-theme text-white hover:bg-opacity-80 hover:border-opacity-80 transition duration-300 ease-in-out"
            onClick={() => handleUserChoice(person2Name)}
          >
            Choose {person2Name}
          </button>
        </div>

        {winner && (
          <div className="mt-5 w-2/3">
            <h2 className="text-center text-xl underline">
              {winner} has more money now!
            </h2>
            <p className="text-md text-center">
              The reason {winner} has more money now is because their total
              assets are calculated based on their Rate per Annum (RPA), monthly investments, and lump sum amount. The total assets
              are the sum of RPA multiplied by the number of years, monthly
              investments multiplied by 12 months and the number of years, and
              the lump sum amount.
            </p>
            <p className="text-md text-center">
              For {winner}, the total assets are $
              {winner === "Person1" ? person1TotalAssets.toFixed(2) : person2TotalAssets.toFixed(2)},
              while the other trader's total assets are $
              {winner === "Person2" ? person2TotalAssets : person1TotalAssets}.
              Therefore, {winner} has more money now.
            </p>
          </div>
        )}

        {selectedOption && !winner && (
          <div className="mt-5 w-2/3">
            <h2 className="text-center text-xl">Sorry, better luck next time!</h2>
            <p className="text-md text-center">
              You chose {selectedOption}, but the correct trader with more money now is {person1TotalAssets > person2TotalAssets ? {person1Name} : {person2Name}}.
            </p>
          </div>
        )}

        <div className="absolute bottom-4 right-4">
          <button
            className="bg-theme text-white font-bold py-2 px-4 rounded hover:bg-opacity-80 hover:border-opacity-80 transition duration-300 ease-in-out"
            onClick={handleNextQuestion}
          >
            Next &raquo;
          </button>
        </div>
      </div>
    </>
  );
};


export default WhoGetsMore;
