import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Notification } from '@/domain/notification/enterprise/entities/notification';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { Either, right } from '@/core/either';

export interface SendNotificationUseCaseRequest {
    recipientId: string;
    title: string;
    content: string;
}

export type SendNotificationUseCaseResponse = Either<
    null,
    {
        notification: Notification;
    }
>;

export class SendNotificationUseCase {
    constructor(private notificationRepository: NotificationsRepository) {}

    async handle({
        recipientId,
        title,
        content,
    }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
        const notification = Notification.create({
            recipientId: new UniqueEntityID(recipientId),
            title,
            content,
        });

        await this.notificationRepository.create(notification);

        return right({ notification });
    }
}
