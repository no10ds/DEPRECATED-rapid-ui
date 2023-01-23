# rAPId UI

<img src="https://github.com/no10ds/rapid-api/blob/main/logo.png?raw=true" display=block margin-left=auto margin-right=auto width=60%;/>


The rAPId service allows users to ingest, validate and query data via an API. This repo provides the user interface service for rAPId version >= 5.0

<br />
<p align="center">
<a href="https://ukgovernmentdigital.slack.com/archives/C03E5GV2LQM"><img src="https://user-images.githubusercontent.com/609349/63558739-f60a7e00-c502-11e9-8434-c8a95b03ce62.png" width=160px; /></a>
</p>

# About

Since rAPId version 5.0 the user interface to interact with the API was seperated into it's own service. The user interface is compiled and built to static html files and hosted through a Cloud Delivery Network (CDN).

# Tech Stack 🍭

- Typescript
- NodeJs
- NextJs
# Developing

This is a quick guide to running the rAPId UI locally for development. For greater details please see the [Contributing README](docs/guides/contributing.md)

## Prerequisites

Install all the required tools
- [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm#installing-and-updating)
- Install and use the required version of node `nvm use` 

Install the packages and pre-commit hooks.

1. Install packages & husky `make npm-setup`

## Running Locally 🏃‍♂️

First you need to set the following environment variable:

```
REACT_APP_API_URL=
```

This is the url of the locally running version of rAPId you want to test the UI against.

To run the app locally you can then run `make dev`.