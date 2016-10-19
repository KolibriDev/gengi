
dev-ios: styles run-ios dev-styles
dev-android: styles run-android dev-styles

run-ios:
	react-native run-ios

run-android:
	react-native run-android

styles:
	react-native-css \
	-i ./lib/styles/index.scss \
	-o ./lib/styles/index.js \
	--pretty

dev-styles:
	supervisor \
	--quiet \
	--no-restart-on exit \
	--watch 'lib' \
	--extensions 'scss' \
	--exec make styles
