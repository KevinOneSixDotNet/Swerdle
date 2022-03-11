# swerdle
React/.NET 6 Clone of Popular Online Daily Puzzle Game

Play the original version at: https://www.nytimes.com/games/wordle/index.html

Currently hosted as a docker containt on a Google Cloud App Engine instance: https://swerdle.ue.r.appspot.com/.

*Absolutely no monetization is made off of the hosted version, it is just for demo purposes*

<ul>
  <li>Used Create-React-App to generate a basic React template using TypeScript</li>
  <li>Removed class base component and opted for only functional components</li>
  <li>Installed and utilized <a href="https://mui.com/">Material UI</a> over bootstrap for it's ease of use with React. All imports are specific to the component to avoid bloating final build size</li>
  <li>Created .NET 6 Asp Net Core WebApi from dotnet cli to back app for two operations: getting a new word from Wordle's list of guesses and answers and validating a guess</li>
</ul>
