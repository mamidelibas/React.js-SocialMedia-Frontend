import Grid from "@mui/material/Grid";
import Link from "next/link";

export default function UserFollowers({ followers }) {
  return (
    <>
      <div>
        <Grid container className="gap-5">
          {followers?.map((follower) => {
            return (
              <Grid item xs={3}>
                <div className="bg-gray-100 rounded border flex items-center gap-3 p-2">
                  <img
                    src="https://picsum.photos/250/250"
                    className="h-16 w-16 rounded-full"
                  />
                  <div className="flex flex-col">
                    <Link href={`/${follower.username}`} className="font-bold">
                      {follower.name} {follower.lastname}
                    </Link>
                    <Link href={`/${follower.username}`}>
                      @{follower.username}
                    </Link>
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
