import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'users',
  title: 'Users',
  type: 'document',
  fields: [
    defineField({
      name: 'displayName',
      title: 'User Name',
      type: 'string',
    }),
    defineField({
      name: 'uid',
      title: 'User Id',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),
    defineField({
      name: 'phoneNumber',
      title: 'Contact Number',
      type: 'string',
    }),
    defineField({
      name: 'photoURL',
      title: 'Image Url',
      type: 'string',
    }),
    defineField({
      name: 'providerId',
      title: 'Provider Id',
      type: 'string',
    }),
    
  ],
})
