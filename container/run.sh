#!/usr/bin/env

APP_PATH=/keg/app

# If DOC_APP_PATH env is passed override the default app path
if [[ "$DOC_APP_PATH" ]]; then
  APP_PATH="$DOC_APP_PATH"
fi

# Helper to print a message to the terminal
keg_message(){
  echo $"[ KEG-CLI ] $1" >&2
  return
}

# Helper to add the $GIT_KEY env to .npmrc
keg_add_git_key(){
  git config --global url.https://$GIT_KEY@github.com/.insteadOf https://github.com/
  echo "@simpleviewinc:registry=https://npm.pkg.github.com/" > .npmrc
  echo "//npm.pkg.github.com/:_authToken=${GIT_KEY}" >> .npmrc
}

# Helper to remove the $GIT_KEY env
keg_remove_git_key(){
  git config --global url.https://github.com/.insteadOf url.https://$GIT_KEY@github.com/
  rm -rf .npmrc
  unset GIT_KEY
}

# Runs yarn install at run time
# Use when adding extra node_modules to keg-core without rebuilding
keg_run_app_yarn_setup(){

  # Check if $KEG_NM_INSTALL exist, if it doesn't, then return
  if [[ -z "$KEG_NM_INSTALL" ]]; then
    return
  fi

  # Navigate to the app directory, and run the yarn install here
  cd $APP_PATH

  if [[ "$GIT_KEY" ]]; then
    keg_add_git_key
  fi

  keg_message "Running yarn setup for app..."
  yarn setup

  if [[ "$GIT_KEY" ]]; then
    keg_remove_git_key
  fi

}

# Uses yarn link, to link the re-theme lib to the local app
keg_setup_retheme_link(){

  # Setup re-theme to be linkable
  cd $APP_PATH
  yarn link

  # Link re-theme to the app
  cd $APP_PATH/app
  yarn link "@simpleviewinc/re-theme"

}

# Runs a yarn command from the package.json
keg_run_the_app(){

  cd $APP_PATH

  # Check if no exect command exists, or if it's set to web
  # Then default it to run the re-theme app
  if [[ -z "$KEG_EXEC_CMD" || "$KEG_EXEC_CMD" == 'web' ]]; then
    KEG_EXEC_CMD="app"
  fi

  keg_message "Running command 'yarn $KEG_EXEC_CMD'"
  yarn $KEG_EXEC_CMD

}

# Run yarn setup for any extra node_modules to be installed
keg_run_app_yarn_setup

# Start the keg core instance
keg_run_the_app "$@"
