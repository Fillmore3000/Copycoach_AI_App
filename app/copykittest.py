import os
import openai

# Load your API key from an environment variable or secret management service
openai.api_key ="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"
subject = "coffee"
prompt = f"Generate upbeat branding snippet for {subject}"

response = openai.Completion.create(model="text-davinci-002", prompt=prompt, temperature=0, max_tokens=32)
print(response)
