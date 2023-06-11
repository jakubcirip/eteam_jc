osascript -e 'tell application "Terminal" to activate' -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down' -e 'tell application "Terminal" to do script "cd /Users/meldiron/Documents/GitHub/fullstack-boilerplate/Server/ && code . && yarn dev:api" in selected tab of the front window'

osascript -e 'tell application "Terminal" to activate' -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down' -e 'tell application "Terminal" to do script "cd /Users/meldiron/Documents/GitHub/fullstack-boilerplate/Server/ && yarn dev:swagger" in selected tab of the front window'

osascript -e 'tell application "Terminal" to activate' -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down' -e 'tell application "Terminal" to do script "cd /Users/meldiron/Documents/GitHub/fullstack-boilerplate/AngularGlobal/ && code . && ng serve --port 4200" in selected tab of the front window'

osascript -e 'tell application "Terminal" to activate' -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down' -e 'tell application "Terminal" to do script "cd /Users/meldiron/Documents/GitHub/fullstack-boilerplate/AngularCompany/ && code . && ng serve --port 4201" in selected tab of the front window'
