`SELECT array_agg(
    json_build_object(
        'topic_id', discussion_topics.id, 'topic_name', discussion_topics.topic, 'podcast', discussion_topics.podcast, 'podcast_link', discussion_topics.podcast_link
    )
) AS discussion_topics_list,
feedback.*
FROM feedback
LEFT OUTER JOIN feedback_discussion_topics ON feedback.id = feedback_discussion_topics.feedback_id
LEFT OUTER JOIN discussion_topics ON discussion_topics.id = feedback_discussion_topics.dicussion_topic_id
GROUP BY feedback.id
ORDER BY feedback.id;`