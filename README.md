# swerdle
React/.NET 6 Clone of Popular Online Daily Puzzle Game

Play the original version at: https://www.nytimes.com/games/wordle/index.html

Currently hosted as a docker containt on a Google Cloud App Engine instance: https://swerdle.ue.r.appspot.com/

*Absolutely no monetization is made off of the hosted version, it is just for demo purposes. Word lists have been cached as local text files and were provided by <a href="https://gist.github.com/cfreshman">cfreshman</a>*

<ul>
  <li>Used Create-React-App to generate a basic React template using TypeScript</li>
  <li>Removed class base component and opted for only functional components</li>
  <li>Installed and utilized <a href="https://mui.com/">Material UI</a> over bootstrap for it's ease of use with React. All imports are specific to the component to avoid bloating final build size</li>
  <li>Created .NET 6 Asp Net Core WebApi from dotnet cli to back app for two operations: getting a new word from Wordle's list of guesses and answers and validating a guess</li>
  <li>Utilized SPA extensions to use IIS Express as a reverse proxy to the local React app. In production mode, the optimized build of the react app is performed and the static files are referenced.</li>
  <li>Added npm commands to the package.json file to optimize common tasks
    <ul>
      <li> Create a publish folder of the API/optimized React app. </li>
      <li> Deploy to Google Cloud App Engine where it is convereted into a docker container on deployment via the gcloud sdk. </li>
      <li> Create local docker image for verifying app within container functionality outside of gcloud deployment. </li>
      <li> Start app and API in dev mode where API does not need to wait to build React App to static assets before running. </li>
    </ul>
  </li>
  <li>Only hosting on lowest tier of Google Cloud App Engine, no remote builds are being done and no CI/CD is configured for this project.</li>
  <li>All components are functional components using the React.State hooks as a data store. Local storage is used to persist the app state between page refreshes.</li>
</ul>

<br/>
This project took roughly 30 hours of free time to complete for the following reasons:
<ul>
  <li>I had really only used bootstrap 4 before and this was a project I used to learn Material UI better from setting up the overall layout all the way down to small components.</li>
  <li>I had not had to setup an API from scratch.</li>
  <li>I had never deployed an ASP NET CORE app to production.</li>
</ul>
