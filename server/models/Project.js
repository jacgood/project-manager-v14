const { Schema, model } = require('mongoose');

const ProjectSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: 'client'
    },
    assignedUser: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'createdBy'
    },
    dateDue: {
      type: Date
    },
    objectives: [
      {
        title: {
          type: String
        },
        description: {
          type: String
        },
        assignedUser: {
          type: Schema.Types.ObjectId,
          ref: 'user'
        },
        createdBy: {
          type: Schema.Types.ObjectId,
          ref: 'createdBy'
        },
        dateDue: {
          type: Date
        },
        tasks: [
          {
            title: {
              type: String
            },
            description: {
              type: String
            },
            assignedUser: {
              type: Schema.Types.ObjectId,
              ref: 'user'
            },
            createdBy: {
              type: Schema.Types.ObjectId,
              ref: 'createdBy'
            },
            dateDue: {
              type: Date
            }
          },
          {
            timestamps: {
              createdAt: 'created_at',
              updatedAt: 'updated_at'
            }
          }
        ]
      },
      {
        timestamps: {
          createdAt: 'created_at',
          updatedAt: 'updated_at'
        }
      }
    ]
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);
module.exports = model('projects', ProjectSchema);
