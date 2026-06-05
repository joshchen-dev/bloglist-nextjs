ALTER TABLE "reading_list" DROP CONSTRAINT "reading_list_user_id_blog_id_pk";--> statement-breakpoint
ALTER TABLE "reading_list" ADD COLUMN "id" serial PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "reading_list" ADD CONSTRAINT "reading_list_user_id_blog_id_unique" UNIQUE("user_id","blog_id");