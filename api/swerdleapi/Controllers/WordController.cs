using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace swerdleapi.Controllers;

[ApiController]
[Route("[controller]")]
public class WordController : ControllerBase
{
    public WordController()
    {
    }

    [HttpGet("NewWord")]
    public async Task<ActionResult> Word()
    {
        var answers = await System.IO.File.ReadAllLinesAsync("answers.txt");

        int start = new Random().Next(0, answers.Length);

        return Ok(new { newWord = answers.Skip(start).Take(1).First() });
    }

    [HttpPost("CheckWord")]
    public async Task<ActionResult> CheckActiveGuess(string wordToCheck)
    {
        var possibleGuesses = await System.IO.File.ReadAllLinesAsync("guesses.txt");

        var answers = await System.IO.File.ReadAllLinesAsync("answers.txt");

        return Ok(new
        {
            validationResult =
            possibleGuesses.Concat(answers).FirstOrDefault(word => string.Equals(word, wordToCheck, StringComparison.InvariantCultureIgnoreCase)) != null
        });
    }
}
