MAIN_FILE="$1"
APP_FILE="$2"
AUTH="$3"

sed -i "1 a import { BrowserRouter } from \'react-router-dom\'" "$APP_FILE";
sed -i "/<Main \\/>/ i \\\t\t<BrowserRouter>" "$APP_FILE";
sed -i "s/<Main \\/>/\t &/" "$APP_FILE";
sed -i "/<Main \\/>/ a \\\t\t</BrowserRouter>" "$APP_FILE";
sed -i "1 a import { Switch, Route, Redirect } from \'react-router-dom\'" "$MAIN_FILE";
sed -i "/<Home \\/>/d" "$MAIN_FILE";
sed -i "/<Header \\/>/ a \\\t\t\t<Switch>" "$MAIN_FILE";
sed -i "/<Switch>/ a \\\t\t\t</Switch>" "$MAIN_FILE";
sed -i '/<Switch>/ a \\t\t\t\t<Redirect from="/" to="/home" />' "$MAIN_FILE";

if [ -z "$AUTH" ]
then
cat > routes.txt << EOF
const routes = [
  {
    path: '/',
    component: Home
  }
];

EOF
else
cat > routes.txt << EOF
const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/signup',
    component: Auth
  },
  {
    path: '/login',
    component: Auth
  },
];

EOF
sed -i "2 a import Auth from \'./components/common/Auth\'" "$MAIN_FILE"
fi

cat >> routes.txt << EOF
const RenderRoutes = () => routes.forEach(route => <Route path={route.path} component={route.component} />);
EOF

sed -i '/import Header/r routes.txt' "$MAIN_FILE"
sed -i '/import Header/ a \\n' "$MAIN_FILE"
sed -i "/<Switch>/ a \\\t\t\t\t<RenderRoutes />" "$MAIN_FILE"
rm ./routes.txt