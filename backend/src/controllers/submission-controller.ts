import prisma from '@src/prisma/create-prisma-instance';
import type { SubmissionFormData } from '@src/types/submission-types';
import { Submission, SubmissionStatus } from '@prisma/client';

class SubmissionController {
  async createSubmission(submittedData: SubmissionFormData): Promise<Submission> {
      const createdSubmission = await prisma.submission.create({
        data: submittedData
      });

      return createdSubmission;
  }
  //use with try catch
  async deleteSubmission(submissionId: number): Promise<Submission> {
    const deletedSubmission = await prisma.submission.delete({
      where: {
        id: submissionId,
      }
    });

    return deletedSubmission;
  }
  //use with try catch
  async updateSubmissionStatus(submissionId: number, newStatus: SubmissionStatus): Promise<Submission> {
    const updatedSubmission = await prisma.submission.update({
      where: {
        id: submissionId,
      },
      data: {
        submissionStatus: newStatus
      }
    });

    return updatedSubmission;
  }
  //@TODO: Instead of getting all submissions, ability querying with parameters will be added. 
  async getAllSubmissions() :Promise<Submission[] | []> {
    return await prisma.submission.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
  }
}

export default new SubmissionController();