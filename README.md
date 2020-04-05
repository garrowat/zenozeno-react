# Zenozeno UI
> React UI for the Zenozeno deep learning language model

## About
Ever wanted to have your very own insane comedian-philosopher? Look no further.

Zenozeno is an AI quote bot that does its very best to sound human by predicting the next word in a sequence until it hits a period.

Under the hood, Zenozeno was made by fine-tuning the 117M (small) version of OpenAI's GPT-2 language model on a Wikiquotes dataset of around 40,000 quotes.

This means that Zenozeno is best at creating short, proverb-like quotables (although GPT-2 makes it pretty good at anything); giving it an input like "Politics is", or "Javascript is not" may work best.

## Warning
The underlying language model, GPT-2, was trained on a staggeringly massive amount of human language, much of it online. This is what makes it so good at what it does. However, this can also cause Zenozeno to say disturbing and/or (hopefully) hilarious things. Sometimes Zenozeno can get rather dark, beware!

## Usage
Right now I'm not publishing the API (though you can puzzle it out from my live site's API calls), but the plan is to show you how to host your own model API, which you could then hook up to this UI.

To run it anyway:
- Clone this repo using `git clone`
- Navigate to repo directory by typing `cd zenozeno-react`
- Ensure that you're on the master branch with `git checkout master`
- Run `npm install`
- Run `npm run start`
- Navigate to `127.0.0.1:3000`
