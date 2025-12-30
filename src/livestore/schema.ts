import {
  defineMaterializer,
  Events,
  makeSchema,
  Schema,
  State,
} from "@livestore/livestore";

export const tables = {
  likes: State.SQLite.table({
    name: "likes",
    columns: {
      id: State.SQLite.text({ primaryKey: true }),
      count: State.SQLite.integer({ default: 0 }),
    },
  }),
};

export const events = {
  likeAdded: Events.synced({
    name: "v1.LikeAdded",
    schema: Schema.Struct({}),
  }),
};

const materializers = State.SQLite.materializers(events, {
  [events.likeAdded.name]: defineMaterializer(events.likeAdded, (_, ctx) => {
    const likes = ctx.query(tables.likes.first());

    if (!likes) {
      return tables.likes.insert({ id: "counter", count: 1 });
    }
    return tables.likes.update({ id: "counter", count: likes.count + 1 });
  }),
});

const state = State.SQLite.makeState({ tables, materializers });

export const schema = makeSchema({ events, state });
