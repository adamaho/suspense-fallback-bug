import { Suspense } from "solid-js";
import { Title, useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import Counter from "~/components/Counter";

export function routeData() {
  const p1 = createServerData$(() => {
    return new Promise((res) => {
      setTimeout(() => {
        res({
          hello: "world",
        });
      }, 3000);
    });
  });

  const p2 = createServerData$(() => {
    return new Promise((res) => {
      setTimeout(() => {
        res({
          foo: "bar",
        });
      }, 6000);
    });
  });

  return {
    p1,
    p2,
  };
}

export default function Home() {
  const data = useRouteData<typeof routeData>();

  return (
    <main>
      <Title>Hello World</Title>
      <h1>Hello world!</h1>
      <Counter />
      <Suspense fallback={<p>Loading p1</p>}>
        <p>{data.p1()?.hello}</p>
      </Suspense>
      <Suspense fallback={<p>Loading p2</p>}>
        <p>{data.p2()?.foo}</p>
      </Suspense>
    </main>
  );
}