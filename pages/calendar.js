import FullCustomCalendar from '../components/calendar/fullcalendar'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import rootReducer from '../store/reducer'
import {getSession} from "next-auth/client";

let store = createStore(rootReducer, applyMiddleware(thunk))

const Calendar = () => {
  return (
    <Provider store={store}>
      < FullCustomCalendar />
    </Provider>
  )
};

export default Calendar;

export async function getServerSideProps(context) {
    const session = await getSession({req: context.req});

    if (!session) {
        return {
            redirect: {
                destination: "/auth",
                permanent: false,
            },
        };
    }

    return {
        props: {
            session,
        },
    };
}