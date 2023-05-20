import clientPromise from "../lib/mongodb";
import Style from "/styles/PageStandard.module.css"

export default function Users({ users }) {
    return (
        <div className={Style.inner}>
            <h1>Top 20 users of All Time</h1>
            <p>
                <small>(According to Metacritic)</small>
            </p>
            <ul>
                {users.map((user) => (
                    <li>
                        <h2>{user.name}</h2>
                        <h3>{user.email}</h3>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db("powerhourdb");

        const users = await db
            .collection("Users")
            .find({})
            .sort({ metacritic: -1 })
            .limit(20)
            .toArray();

        return {
            props: { users: JSON.parse(JSON.stringify(users)) },
        };
    } catch (e) {
        console.error(e);
    }
}