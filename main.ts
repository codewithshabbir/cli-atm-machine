import inquirer from "inquirer";

async function main() {
  interface questionType {
    userId: string;
    pin: number;
    pinVerify: number;
  }

  const promptQuestions: questionType = await inquirer.prompt([
    {
      type: "input",
      name: "userId",
      message: "Enter your User ID:",
    },
    {
      type: "number",
      name: "pin",
      message: "Enter your Pin:",
    },
    {
      type: "number",
      name: "pinVerify",
      message: "Verify your Pin:",
    },
  ]);

  let { userId, pin, pinVerify } = promptQuestions;

  let pinCheck: boolean = false;

  while (!pinCheck) {
    if (pin === pinVerify) {
      console.log("\n");
      console.log("************************************************");
      console.log(`************** Welcome ${userId} ***************`);
      console.log("************************************************");
      console.log("\n");

      let balance = Math.round(Math.random() * 100000);
      let mainMenuPromptCheck = false;

      while(!mainMenuPromptCheck){
        const mainMenuPrompt: { mainMenu: string } = await inquirer.prompt({
          type: "list",
          name: "mainMenu",
          message: "Please select your transaction",
          choices: [
            "Balance Inquiry", "Withdrawal", "Deposit", "Exit",
          ],
        });

        if (mainMenuPrompt.mainMenu.toLowerCase() == "balance inquiry") {
          console.log("\n");
          console.log("***********************************************************");
          console.log(`**************** Your Balance: ${balance} *****************`);
          console.log("***********************************************************");
          console.log("\n");
        }
        else if(mainMenuPrompt.mainMenu.toLowerCase() == "withdrawal"){
          console.log("\n");
          console.log("**********************************************************************");
          console.log(`**************** Your Current Balance is: ${balance} *****************`);
          console.log("**********************************************************************");
          console.log("\n");
          if(balance <= 0){
            console.log("\n");
            console.log("****************************************************************************");
            console.log(`**************** You don't have enough balance: ${balance} *****************`);
            console.log("****************************************************************************");
            console.log("\n");
          }
          else{
            const withdrawalAmount: { withdrawl: string } = await inquirer.prompt({
              type: "list",
              name: "withdrawl",
              message: "Please select your amount",
              choices: ["5000", "10000", "15000", "20000", "25000", "Other Amount"]
            });
            if(balance >= Number(withdrawalAmount.withdrawl)){
              balance -=  Number(withdrawalAmount.withdrawl);
              console.log("\n");
              console.log("**********************************************************************");
              console.log(`**************** Your Updated Balance is: ${balance} *****************`);
              console.log("**********************************************************************");
              console.log("\n");
            }
            else if(withdrawalAmount.withdrawl.toLowerCase() == "other amount"){
              const withdrawalOtherAmount: { withdrawl: number } = await inquirer.prompt({
                type: "number",
                name: "withdrawl",
                message: "Please enter your amount:",
              });
              if(balance >= withdrawalOtherAmount.withdrawl){
                balance -=  withdrawalOtherAmount.withdrawl;
                console.log("\n");
                console.log("**********************************************************************");
                console.log(`**************** Your Updated Balance is: ${balance} *****************`);
                console.log("**********************************************************************");
                console.log("\n");
              } 
              console.log("\n");
              console.log("**********************************************************************");
              console.log(`**************** Your Updated Balance is: ${balance} *****************`);
              console.log("**********************************************************************");
              console.log("\n");
            }
          }
        }
        else if(mainMenuPrompt.mainMenu.toLowerCase() == "deposit"){
          console.log("\n");
          console.log("**********************************************************************");
          console.log(`**************** Your Current Balance is: ${balance} *****************`);
          console.log("**********************************************************************");
          console.log("\n");

          const depositAmount: { deposit: number } = await inquirer.prompt({
            type: "number",
            name: "deposit",
            message: "Please enter your amount:",
          });

          if(balance >= depositAmount.deposit){
            balance +=  depositAmount.deposit;
            console.log("\n");
            console.log("**********************************************************************");
            console.log(`**************** Your Updated Balance is: ${balance} *****************`);
            console.log("**********************************************************************");
            console.log("\n");
          } 
        }
        else if(mainMenuPrompt.mainMenu.toLowerCase() == "exit"){
          console.log("\n");
          console.log("***********************************************************");
          console.log(`**************** Thanks for Using Our ATM *****************`);
          console.log("***********************************************************");
          console.log("\n");
          mainMenuPromptCheck = true;
        }
      }
      pinCheck = true;
    } else {
      console.log("\n");
      console.log("***********************************************************");
      console.log(`************** Your Pin is Wrong Try Again! ***************`);
      console.log("***********************************************************");
      console.log("\n");

      const pinVerifyPrompt: { pinVerify: number } = await inquirer.prompt({
        type: "number",
        name: "pinVerify",
        message: "Verify your Pin:",
      });

      pinVerify = pinVerifyPrompt.pinVerify;
    }
  }
}

main();
