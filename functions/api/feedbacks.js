export async function onRequestGet(context) {
  try {
    const { results } = await context.env.DB.prepare(
      'SELECT * FROM feedbacks ORDER BY created_at DESC'
    ).all();

    return new Response(JSON.stringify(results), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: '서버 오류가 발생했습니다.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const name = (body.name || '').trim();
    const content = (body.content || '').trim();

    if (!name) {
      return new Response(JSON.stringify({ message: '이름을 입력해주세요.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!content) {
      return new Response(JSON.stringify({ message: '의견을 입력해주세요.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const info = await context.env.DB.prepare(
      'INSERT INTO feedbacks (name, content) VALUES (?, ?)'
    ).bind(name, content).run();

    const inserted = await context.env.DB.prepare(
      'SELECT * FROM feedbacks WHERE id = ?'
    ).bind(info.meta.last_row_id).first();

    return new Response(JSON.stringify(inserted), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: '서버 오류가 발생했습니다.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
