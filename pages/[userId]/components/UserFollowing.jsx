import Grid from "@mui/material/Grid";
import Link from "next/link";

export default function UserFollowing({ following }) {
  return (
    <>
      <div>
        <Grid container className="gap-5">
          {following?.map((user) => {
            return (
              <Grid item xs={3}>
                <div className="bg-gray-100 rounded border flex items-center gap-3 p-2">
                  <img
                    src="https://picsum.photos/250/250"
                    className="h-16 w-16 rounded-full"
                  />
                  <div className="flex flex-col">
                    <Link href={`/${user.username}`} className="font-bold">
                      {user.name} {user.lastname}
                    </Link>
                    <Link href={`/${user.username}`}>@{user.username}</Link>
                  </div>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </>
  );
}
