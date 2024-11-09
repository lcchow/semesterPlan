const mockResponse = {
  id: 'msg_01EcRsNp17VKKSE1Vg1Seiu3',
  type: 'message',
  role: 'assistant',
  model: 'claude-3-5-sonnet-20241022',
  content: [
    {
      type: 'text',
      text: `[
        {
          "summary": "Weekly Activity Week 1: Technology and values",
          "start": {"date": "2024-09-13"},
          "end": {"date": "2024-09-13"},
          "description": "Due by 11:59pm"
        },
        {
          "summary": "Weekly Activity Week 2: Research Ethics I",
          "start": {"date": "2024-09-16"},
          "end": {"date": "2024-09-16"},
          "description": "Due by 12pm"
        },
        {
          "summary": "Online Activity Week 3: Research Ethics II",
          "start": {"date": "2024-09-23"},
          "end": {"date": "2024-09-23"},
          "description": "Due by 12pm"
        },
        {
          "summary": "Assignment 1 - Computing Science Research and Ethical Guidelines (5%)",
          "start": {"date": "2024-09-26"},
          "end": {"date": "2024-09-26"},
          "description": "Due by 11:59pm"
        },
        {
          "summary": "Online Activity Week 4: Information and Privacy",
          "start": {"date": "2024-09-30"},
          "end": {"date": "2024-09-30"},
          "description": "Due by 12pm"
        },
        {
          "summary": "Online Activity Week 5: Intellectual Property",
          "start": {"date": "2024-10-07"},
          "end": {"date": "2024-10-07"},
          "description": "Due by 12pm"
        },
        {
          "summary": "Online Activity: Intellectual Property",
          "start": {"date": "2024-10-14"},
          "end": {"date": "2024-10-14"},
          "description": "Due by 12pm"
        },
        {
          "summary": "Midterm Exam (25%)",
          "start": {"dateTime": "2024-10-16T15:45:00-07:00"},
          "end": {"dateTime": "2024-10-16T17:00:00-07:00"},
          "description": "In-person in CSIL"
        }
      ]`
    }
  ],
  stop_reason: 'end_turn',
  stop_sequence: null,
  usage: { input_tokens: 761, output_tokens: 567 }
};

export default mockResponse;