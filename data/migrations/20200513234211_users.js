exports.up = function (knex) {
  return knex.schema.createTable("users", (tbl) => {
    tbl.increments();
    tbl.text("first_name", 128);
    tbl.text("last_name", 128);

    tbl.text("email", 128).notNullable();

    tbl.text("phone");
    tbl.text("password", 128).notNullable();

    tbl.text("city", 128);
    tbl.text("state", 128);
    tbl.text("country", 128);
    tbl.text("zipcode", 128);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
