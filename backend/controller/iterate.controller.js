import axios from "axios";
import dotenv from 'dotenv';
import { asyncHandler } from "../error.middleware.js";

dotenv.config();

const TOVUTI_API_KEY = process.env.TOVUTI_API_KEY;

const userData = asyncHandler (async (req, res) => {
    const userId = req.query.userId;
    const courseId = req.query.courseId;
    try {
        const [ userResponse, courseResponse ] = await Promise.all([
            axios.get(`https://api.tovuti.io/api/v1/user/${userId}`, {
                headers: { Authorization: `Bearer ${TOVUTI_API_KEY}`},
            }),

            axios.get(`https://api.tovuti.io/api/v1/course/${courseId}`, {
                headers: { Authorization: `Bearer ${TOVUTI_API_KEY}`},
            }),
        ])

        const user = userResponse.data;
        const course = courseResponse.data;

        const userAttr = [
            'id',
            'email',
            'customFields',
        ];
        const userCustomFieldIds = [19, 20, 41, 37, 29];

        const courseAttr = [
            'id',
            'title',
            'customFields',
        ];
        const courseCustomFieldIds = [34, 32];

        const filterData = (data, attributes, customFieldIds) => {
            const filteredItem = {}

            attributes.forEach((attr) => {
                if (attr === 'customFields') {
                    const filteredCustomFields = data.customFields.filter((field) => customFieldIds.includes(field.field_id));

                    filteredCustomFields.forEach((field) => {
                        const attributeName = field.title
                        .toLocaleLowerCase()
                        .split(' ')
                        .join('_')
                        ;(filteredItem)[attributeName] = field.value;
                    })
                } else {
                    filteredItem[attr] = data[attr];
                }
            })

            return filteredItem;
        }
            
        res.status(200).send({
            user: filterData(user, userAttr, userCustomFieldIds),
            course: filterData(course, courseAttr, courseCustomFieldIds),
        });

    } catch (err) {
        console.error('Error fetching user data:', err);
        res.status(500).json({ message: 'Internal Error'});
    }
});

export { userData }