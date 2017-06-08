/**
 * Created by chang_su on 2017/5/18.
 */
import Main from './Main.jsx'
import Tasks from './Content/Tasks/index.jsx'
import History from './Content/History/index.jsx'
import Graduation from './Content/Graduation/index.jsx'

export default [
    {
        path: '/',
        component: Main,
        indexRoute: { component: Tasks },
        childRoutes: [
            { path: 'history', component: History },
            { path: 'graduation', component: Graduation },
        ]
    }
]
