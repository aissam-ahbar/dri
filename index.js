name: Greeting on variable day

on:
  workflow_dispatch

env:
  DAY_OF_WEEK: $URI

jobs:
  greeting_job:
    runs-on: ubuntu-latest
    env:
      Greeting: Hello
    steps:
      - name: "Say Hello Mona it's Monday"
        run: echo "Today is $DAY_OF_WEEK"
        env:
          First_Name: Mona
