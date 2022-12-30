import { Form } from "@remix-run/react";
import type { ActionArgs} from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { prisma } from "~/db.server";

export async function action({request} : ActionArgs){
  const formData = await request.formData();
  const title = formData.get('fit');
  if (typeof title !== 'string' || title.trim().length === 0){
    return json(
      {errors: {title: 'Title is required', body: null}},
      { status: 400 }
    );
  }

  return prisma.fitlog.create({
    data: {
      title,
    }
  })
}

export default function NewFitLogPage() {
  return (
    <Form
      method ="post"
    >
      <h2>New Fit Log</h2>
      <div>
        <label>
          <input
            type="text"
            name="fit"
          />
          New
        </label>
      </div>
      <button
      type="submit"
      >
        Save
      </button>
    </Form>
  )
}